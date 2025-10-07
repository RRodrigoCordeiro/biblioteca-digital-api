import { PartialType } from "@nestjs/swagger";
import { CreateLoansDto } from "./create-loans.dto"; 


export class UpdateLoanDto extends PartialType(CreateLoansDto){}