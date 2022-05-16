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
        return Inertia::render('Doctors/Create', [
            'users' => User::where('role', 2)->get(),
        ]);
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

    public function edit($id)
    {

        return Inertia::render('Doctors/Edit', [
            'doctor' => Doctors::find($id),
            'users' => User::where('role', 2)->get(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'fullname' => 'required',
            'field' => 'required',
            'mobile' => 'required',
            'users_id' => 'required',
        ]);
        $doctors = Doctors::find($id);
        $doctors->update($request->all());
        return redirect()->route('doctors.index');
    }

    public function destroy($id)
    {
        Doctors::find($id)->delete();
        return redirect()->route('doctors.index');
    }
}
