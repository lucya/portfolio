import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack5';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import resumePdf from '../../assets/resource/resume.pdf';
import * as config from '../../app/config'

// workerSrc 정의 하지 않으면 pdf 보여지지 않음.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function Resume() {
  const pdfUrl = config.AVOID_CORS_URL + config.GET_FIREBASE_FILE_URL('resume.pdf');

  const [numPages, setNumPages] = useState(0);
  const [width, setWidth] = useState(0)
  const [file, setFile] = useState()

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages); // pdf.numPages와 동일 
  }
  const onDocumentLoadError = (err) => {
    console.error('Error while loading document! ' + err.message);
    // cors avoid api 호출 횟수 초과시 aasset 내의 파일읽기로 임시 변경.
    setFile(resumePdf);
  }

  const handleResizePdf = () => {
    const elm = document.querySelector('.home-container .resume-wrap')
    elm && setWidth(elm.clientWidth)
    // let cWidth = elm?.clientWidth;
    // setWidth(cWidth);
  }

  useEffect(() => {
    setFile({ url: pdfUrl })
    window.addEventListener('resize', handleResizePdf);
    handleResizePdf();
  }, [])

  return (
    <>
      <Document
        file={file}// cors 우회하기
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading='Nature에 대해 알아보는 중이예요.. 잠시만 기다려주세요.'
      >
        {/* height, width는 number 타입으로 vh, %는 먹지 않습니다. */}
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            width={width}
            pageNumber={index + 1}
            key={index}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </>
  );
}

export default Resume