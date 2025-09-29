import { Injectable } from "@nestjs/common";


@Injectable()
export class BookUtils {
  splitString(text: string){
    return text.split("")
  }
}