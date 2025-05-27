<?php

namespace App\Http\Controllers;

use App\Models\Demande;
use Illuminate\Http\Request;

class DemandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $demandes = Demande::with([
                'category',
                'offres.artisan.specialite',
                "client"
            ])->get();
            return response()->json([
                'success' => true,
                'message' => 'Demande list successfully retrieved.',
                'data' => $demandes
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving demandes.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $vaildatedData = $request->validate([
                'titre' => 'required|string|max:255',
                'adresse' => 'required|string|max:255',
                'description' => 'required|string',
                'budget' => 'required|numeric',
                'status' => 'required|string|in:en_cours,en_attente,Annulé',
                'telephone' => 'required|string|max:16',
                'photo' => 'required|image|mimes:jpg,png,jpeg',
                'dateExecution' => 'required|date',
                'dateCreation' => 'required|date',
                'idClient' => 'required|integer',
            ]);
            if ($request->hasFile('photo')) {
                $image = $request->file('photo');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $image->move(public_path('uploads/demandes_images'), $imageName);
            };
            $demande = new Demande();
            $demande->titre = $vaildatedData['titre'];
            $demande->adresse = $vaildatedData['adresse'];
            $demande->budget = $vaildatedData['budget'];
            $demande->status = $vaildatedData['status'];
            $demande->description = $vaildatedData['description'];
            $demande->telephone = $vaildatedData['telephone'];
            $demande->dateExecution = $vaildatedData['dateExecution'];
            $demande->photo = $vaildatedData['photo'];
            $demande->dateCreation = $vaildatedData['dateCreation'];
            $demande->idClient = $vaildatedData['idClient'];
            $demande->save();
            return response()->json([
                'success' => true,
                'message' => 'Demande ajouté avec succée.',
                'data' => $demande
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'erreur de validation.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "erreur dans l'ajout de demande.",
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $demande = Demande::find($id);
            if (!$demande) {
                return response()->json([
                    'success' => false,
                    'message' => 'Demande not found.'
                ], 404);
            }
            $demande->update([
                'status' => $request->status
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Demande updated successfully.',
                'data' => $demande
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating the demande.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $demande = Demande::find($id);
            if (!$demande) {
                return response()->json([
                    'success' => false,
                    'message' => 'Demande not found.'
                ], 404);
            }

            $demande->delete();

            return response()->json([
                'success' => true,
                'message' => 'Demande successfully removed.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error deleting demande.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
