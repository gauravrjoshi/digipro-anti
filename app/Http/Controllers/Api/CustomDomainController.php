<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CustomDomain;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustomDomainController extends Controller
{
    public function index(Request $request)
    {
        $portfolio = $request->user()->portfolio;
        
        if (!$portfolio) {
            return response()->json(['error' => 'No portfolio found'], 404);
        }

        $domains = CustomDomain::where('portfolio_id', $portfolio->id)->get();
        
        return response()->json($domains);
    }

    public function store(Request $request)
    {
        $portfolio = $request->user()->portfolio;
        
        if (!$portfolio) {
            return response()->json(['error' => 'No portfolio found'], 404);
        }

        // Check if user is subscribed (Pro feature)
        if (!$request->user()->subscribed('default')) {
            return response()->json(['error' => 'Custom domains require a Pro subscription'], 403);
        }

        $validator = Validator::make($request->all(), [
            'domain' => ['required', 'string', 'regex:/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}$/i', 'unique:custom_domains,domain']
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $domain = CustomDomain::create([
            'portfolio_id' => $portfolio->id,
            'domain' => strtolower($request->domain),
            'verification_token' => CustomDomain::generateVerificationToken(),
            'verified' => false,
            'dns_configured' => false,
            'ssl_status' => 'pending',
        ]);

        return response()->json($domain, 201);
    }

    public function verify(Request $request, $id)
    {
        $domain = CustomDomain::findOrFail($id);
        
        // Check ownership
        if ($domain->portfolio_id !== $request->user()->portfolio->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Local testing bypass for .test domains
        if (str_ends_with($domain->domain, '.test')) {
            $verified = true;
        } else {
            // Check DNS TXT record for verification
            $txtRecords = @dns_get_record('_portfolio-verify.' . $domain->domain, DNS_TXT);
            
            $verified = false;
            if ($txtRecords) {
                foreach ($txtRecords as $record) {
                    if (isset($record['txt']) && $record['txt'] === $domain->verification_token) {
                        $verified = true;
                        break;
                    }
                }
            }
        }

        // Check A record points to server
        $dnsConfigured = false;
        if (str_ends_with($domain->domain, '.test')) {
            $dnsConfigured = true;
        } else {
            $aRecords = @dns_get_record($domain->domain, DNS_A);
            if ($aRecords && count($aRecords) > 0) {
                $dnsConfigured = true;
            }
        }

        $domain->update([
            'verified' => $verified,
            'dns_configured' => $dnsConfigured,
        ]);

        return response()->json([
            'verified' => $verified,
            'dns_configured' => $dnsConfigured,
            'message' => $verified ? 'Domain verified successfully!' : 'Verification failed. Please check your DNS records.',
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $domain = CustomDomain::findOrFail($id);
        
        // Check ownership
        if ($domain->portfolio_id !== $request->user()->portfolio->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $domain->delete();
        
        return response()->json(['message' => 'Domain removed successfully']);
    }
}
