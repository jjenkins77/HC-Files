import { NextRequest, NextResponse } from "next/server";
import { movieData } from "@/data/moviesData";
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {

    try {

        const { searchParams } = new URL(req.url);

        const movieName = searchParams.get('movieName') as string;

        const filteredMovies = movieData.filter(movie => movie.Title.toLowerCase().includes(movieName.toLowerCase()));

        const response = filteredMovies.map(movie => ({ label: movie.Title, value: movie.Title }));

        return NextResponse.json({ success: true, data: response })


    } catch (error: any) {

        console.log("error in searching movie by name Server:", error)

        return NextResponse.json({ success: false, message: "something went wrong !" });


    }

}