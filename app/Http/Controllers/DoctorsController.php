<?php

namespace App\Http\Controllers;

use App\Models\Doctors;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DoctorsController extends Controller
{
    public function patients($id){
        $doctor = Doctors::find($id);
        return Inertia::render('Doctors/Patients', [
            'patients' => $doctor->patients,
        ]);
    }

    public function index()
    {
        return Inertia::render('Doctors/Index', [
            'doctors' => Doctors::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Doctors/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'fullname' => 'required',
            'age' => 'required',
            'mobile' => 'required',
        ]);

        Doctors::create($request->all());
    }

    public function show(Doctors $doctors)
    {
        //
    }

    public function edit(Doctors $doctors)
    {
        return Inertia::render('Doctors/Edit', [
            'doctor' => $doctors,
        ]);
    }

    public function update(Request $request, Doctors $doctors)
    {
        $request->validate([
            'fullname' => 'required',
            'age' => 'required',
            'mobile' => 'required',
        ]);

        $doctors->update($request->all());
    }

    public function destroy(Doctors $doctors)
    {
        $doctors->delete();
    }
}
