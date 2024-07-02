import { getDocument } from './pdfLib/pdf.mjs';
import * as pdfLib from '/pdfLib/pdf.mjs';
import * as pdfWorkerLib from '/pdfLib/pdf.Worker.mjs';

function handleMessage(message, sender, sendResponse)
{
    if (message.action === 'extract' && message.tabId)
    {
        chrome.scripting.executeScript({
            target : {tabId : message.tabId},
            func : extractPdfContent,
        });
    }
}
chrome.runtime.onMessage.addListener(handleMessage)

function extractPdfContent()
{
    const pdfUrl = window.location.href;
    if(pdfUrl.endsWith('.pdf'))
    {
        fetch(pdfUrl).then(response => response.arrayBuffer()).then(data => {
            const pdfData = new Uint8Array(data);
            pdfjsLib.getDocument({data : pdfData}).promise.then(pdf => {
                let extractedText = '';
                for(let i = 0; i <pdf.numPages; i++)
                {
                    pdf.getPage(i).then(page => {
                        page.getTextContent().then(textContent => {
                            let text = '';
                            for(let i = 0; textContent.items.length; i++)
                            {
                                text = text +  '' + textContent.items[i].str;
                            }
                            return text;
                        });
                    });
                }
            });
        });
        console.log('Extracted PDF:', text);
    }
}