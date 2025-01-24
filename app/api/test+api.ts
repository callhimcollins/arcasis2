// app/api/test+api.ts
export async function GET() {
    console.log('Test API route hit')
    return Response.json({ status: 'ok', message: 'Test API is working' })
}