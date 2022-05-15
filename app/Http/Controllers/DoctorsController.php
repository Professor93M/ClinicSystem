<?php

namespace App\Http\Controllers;

use App\Models\Doctors;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DoctorsController extends Controller
{
    public function patients($id){
        $doctor = Doctors::find($id);
        return Inertia::render('Doctors/Patients', [
            'patients' => $doctor->patients,
            'users' => User::where('role', 2)->get(),
        ]);
    }

    public function index()
    {
        return Inertia::render('Doctors/Index', [
            'doctors' => Doctors::all(),
            'users' => User::where('role', 2)->get(),
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
            'field' => 'required',
            'mobile' => 'required',
            'users_id' => 'required',
        ]);

        Doctors::create($request->all());
        return redirect()->route('doctors.index');
    }

    public function show(Doctors $doctors)
    {
        //
    }

    public function edit(Doctors $doctors)
    {
        return Inertia::render('Doctors/Edit', [
            'doctor' => $doctors,
            'users' => User::where('role', 2)->get(),
        ]);
    }

    public function update(Request $request, Doctors $doctors)
    {
        $request->validate([
            'fullname' => 'required',
            'field' => 'required',
            'mobile' => 'required',
            'users_id' => 'required',
        ]);

        $doctors->update($request->all());
        return redirect()->route('doctors.index');
    }

    public function destroy(Doctors $doctors)
    {
        $doctors->delete();
        return redirect()->route('doctors.index');
    }
}
