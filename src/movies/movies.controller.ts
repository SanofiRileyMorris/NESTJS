import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { MoviesService } from 'src/movies/movies.service';
import { Movie, Movies } from './movie.interface';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  async searchMovies(
    @Query('searchTerm') searchTerm: string,
  ): Promise<Movies[]> {
    return this.moviesService.searchMovies(searchTerm);
  }

  @Get('list')
  async listMovies(
    @Query('type') searchType: string,
    @Query('page') page: number,
  ): Promise<{ results: Movies[]; total_pages: number }> {
    return this.moviesService.listMovies(searchType, page);
  }

  @Get(':id')
  async getMovie(@Param('id') movieId: string): Promise<Movie> {
    return this.moviesService.getMovie(movieId);
  }

  @Post('favorites/:userId')
  async saveFavMovie(
    @Param('userId') userId: number,
    @Body() input: { movie: string; movieId: number },
  ) {
    return this.moviesService.saveFavMovie(userId, input);
  }

  @Get('favourites/:userId')
  async listFavMovies(@Param('userId') userId: number) {
    return this.moviesService.listFavMovies(userId);
  }
}
