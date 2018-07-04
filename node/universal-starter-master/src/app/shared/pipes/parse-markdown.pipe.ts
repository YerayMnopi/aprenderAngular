import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Pipe({
  name:"parseMarkdown"
})
export class ParseMarkdownPipe implements PipeTransform {

  symbols = [
    {
      markdown: '_',
      html: 'em'
    },
    {
      markdown: '**',
      html: 'strong'
    }
  ]

  transform(paragraph: string): SafeHtml {

    this.symbols.forEach(
      (symbol) => {
        let splittedParagraph = paragraph.split(symbol.markdown);

        paragraph = splittedParagraph.reduce(
          (previousText: string, currentText: string, currentIndex: number) => {
            let tag = '<';

            if (currentIndex % 2 !== 0) {
              tag += '/'; 
            }

            return previousText + currentText + tag + symbol.html + '>';
          }, ''
        );

      }
    );
    return paragraph;
  }
}