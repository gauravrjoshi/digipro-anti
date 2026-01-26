<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\LaravelPdf\Facades\Pdf;

class ResumeController extends Controller
{
    /**
     * Preview or Download resume
     */
    public function download(Request $request, Portfolio $portfolio)
    {
        $user = Auth::user();

        // Allow owner or public if portfolio allows it (logic can be refined)
        // For now restricting to owner for generation, but public download is separate logic usually.
        // If this is for the "Download Resume" button on public portfolio, we generally allow it.
        // But if this is "Generate System Resume", it might be owner-only or public.
        // Assuming this is the "System Generated Resume" feature which is likely owner-only for now, 
        // or public if we want visitors to download the generated resume.
        // Let's stick to the previous logic: explicitly passed portfolio.

        $portfolio->load(['user', 'projects', 'experiences', 'education', 'skills']);

        $template = $request->input('template') ?? $portfolio->resume_template ?? 'modern';
        $mode = $request->input('mode', 'download'); // 'view' or 'download'

        $view = match ($template) {
            'classic' => 'resume.classic',
            'minimal' => 'resume.minimal',
            default => 'resume.pdf', // modern
        };

        $pdf = Pdf::view($view, ['portfolio' => $portfolio])
            ->format('a4')
            ->margins(10, 10, 10, 10); // 10mm margins on all sides

        if ($mode === 'view') {
            return $pdf->inline("resume-{$template}.pdf");
        }

        return $pdf->name("resume-{$template}.pdf")->download();
    }
}
