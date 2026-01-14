<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'portfolio_id' => 'required|exists:portfolios,id',
            'institution' => 'required|string',
            'degree' => 'required|string',
            'start_year' => 'nullable|string',
            'end_year' => 'nullable|string',
        ]);

        $education = Education::create($validated);
        return response()->json($education, 201);
    }

    public function update(Request $request, $id)
    {
        $education = Education::findOrFail($id);
        $education->update($request->all());
        return response()->json($education);
    }

    public function destroy($id)
    {
        Education::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
