import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// MOCK SP-API WEBHOOK RECEIVER
// In reality, Amazon sends a POST request here when an event happens.
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { notificationType, payload } = body;

        console.log("SP-API Webhook Received:", notificationType);

        // Parse the Amazon Payload (Simplified Mock)
        let logMessage = "Detected unknown change via API";
        let category = "API Monitor";

        if (notificationType === 'PRICING_HEALTH') {
            logMessage = `Start Price changed from ${payload.oldPrice} to ${payload.newPrice} for ASIN ${payload.asin}`;
            category = "PPC"; // Pricing/PPC related
        } else if (notificationType === 'LISTING_CHANGE_RECORD') {
            logMessage = `Title updated for ${payload.asin}: "${payload.newTitle.substring(0, 30)}..."`;
            category = "Listing";
        }

        // AUTO-LOG TO FIRESTORE
        // "The Silent Watchdog" - Logging it without human intervention
        await addDoc(collection(db, "work_logs"), {
            clientId: payload.clientId || 'demo-client-1',
            category: category,
            message: `[AUTO-DETECT] ${logMessage}`,
            authorInternal: 'SP-API Watchdog',
            timestamp: serverTimestamp(),
            isPublic: true // Default to public for transparency, or false if sensitive
        });

        return NextResponse.json({ status: 'Logged', timestamp: new Date().toISOString() });

    } catch (error) {
        console.error("Webhook Error", error);
        return NextResponse.json({ error: 'Webhook Failed' }, { status: 500 });
    }
}
