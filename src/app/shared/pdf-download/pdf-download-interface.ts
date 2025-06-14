export interface Html2PdfOptions {
  margin?: number;
  filename?: string;
  image?: { type: string; quality: number };
  html2canvas?: { scale?: number };
  jsPDF?: { unit?: string; format?: string; orientation?: string };
}
