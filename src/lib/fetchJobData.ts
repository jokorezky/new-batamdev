const urlEndpoint =
  process.env.NEXT_PUBLIC_API_URL_INTERNAL || `https://api.kinigo.id`;

export async function fetchJobData(id: string) {
  try {
    const url = `${urlEndpoint}/jobs/${id}`;
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    return await res.json();
  } catch (error) {
    console.error("Fetch job error:", error);
    return null;
  }
}
