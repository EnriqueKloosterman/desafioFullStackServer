import { IsNotEmpty, IsString } from "class-validator";

export class CreateNoteDto {

    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    note: string;

}
