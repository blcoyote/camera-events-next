"use client";
import { firebaseAuth } from "@/firebase";
import HomePage from "./Homepage";




export default function Home() {
    
    const user = firebaseAuth.currentUser;
    const token = firebaseAuth.currentUser?.getIdToken();

    return <HomePage email={user?.email ?? ''} />;
}