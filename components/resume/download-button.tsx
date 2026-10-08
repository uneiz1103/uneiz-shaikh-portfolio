import { IconDownload } from "@/components/icons";

type DownloadButtonProps = {
  pdfHref: string;
  fileName: string;
};

export function DownloadResumeButton({ pdfHref, fileName }: DownloadButtonProps) {
  return (
    <a href={pdfHref} className="btn btn-accent no-print shrink-0" download={fileName}>
      <IconDownload width={16} height={16} />
      Download PDF
    </a>
  );
}
