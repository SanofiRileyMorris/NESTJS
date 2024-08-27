
import { Controller, Get, Query, Param } from '@nestjs/common';
import { MoviesService } from 'src/movies/movies.service';
import { Movie, Movies } from './movie.interface';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Get(':id')
    // async getMovie(@Param('id') movieId: string): Promise<Movie> {
    async getMovie(@Param('id') movieId: string) {

        console.log("testing Get")
        return this.moviesService.getMovie(movieId);
    }

    @Get('search')
    async searchMovies(@Query('query') searchTerm: string): Promise<Movies[]> {
        return this.moviesService.searchMovies(searchTerm);
    }

    @Get('list')
    async listMovies(
        @Query('type') searchType: string,
        @Query('page') page: number,
    ): Promise<{ results: Movies[]; total_pages: number }> {
        return this.moviesService.listMovies(searchType, page);
    }
}
