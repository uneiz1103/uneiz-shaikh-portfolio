import { renderResumePdf } from "@/lib/resume-pdf";

export const dynamic = "force-static";
export const runtime = "nodejs";

export async function GET() {
  const pdf = await renderResumePdf();

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Uneiz-Shaikh-Resume.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
