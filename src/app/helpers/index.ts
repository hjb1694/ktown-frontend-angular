import htmlSanitizer from 'sanitize-html';
import {AllHtmlEntities as Entities} from 'html-entities';
import stringLength from 'string-length';
const entities = new Entities();

export default class Helpers{

    static removeExcessWhitespace(text: string){

        let val = text;
        val = val.replace(/ {2,}/g,' ');
        val = val.replace(/\n{3,}/g,'\n\n');
        val = val.replace(/\t/g,' ');
        val = val.trim();

        return val;

    }

    static stripTags(text: string){

        let val = text;
        val = htmlSanitizer(val, {allowedTags : []});
        return val;

    }

    static stripAllWhitespace(text: string){

        let val = text;
        val = val.replace(/\s/g,'');

        return val;

    }


    //string length with no whitespaces
    static absoluteStringLength(text: string){

        return stringLength(Helpers.stripAllWhitespace(entities.decode(Helpers.stripTags(text))));

    }

    static stringLengthNoExcessWhitespace(text: string){

        return stringLength(Helpers.removeExcessWhitespace(entities.decode(Helpers.stripTags(text))));

    }


}