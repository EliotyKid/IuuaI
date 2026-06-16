export async function downloadFile(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro ao baixar ${url}`);
  }

  return await response.text();
}