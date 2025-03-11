export async function GET(request: Request) {
    const data = { message: "Hello from API!" };
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  }