import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request:any) {
  /* const reqFormData = await request.formData(); */
  const prompt = await request.json();

  try {
    const response = await axios.post(
      `https://backend.isrospaceagent.com/isro-agent/chat/`,
      { prompt: prompt },
      {
        headers: {
          'Authorization': ``,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(response.data.response);
    /* const response = await fetch(`${process.env.BACKEND_API_URL}/chat/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
      },
      body: reqFormData.get('prompt'),
    }); */

    /* const data = await response.json();
    console.log(data);
    if (data.result) {
      return NextResponse.json({ ...data.result });
    } else {
      return NextResponse.json({ error: data.message })
    } */
  } catch (error) {
    console.log("Error while processing user input", error);
    return NextResponse.json({
      error,
    });
  }
}
