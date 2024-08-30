import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Movie, Movies } from './movie.interface';
import { PrismaService } from 'src/middleware/prisma.service';

@Injectable()
export class MoviesService {
  private readonly tmdbApiUrl = 'https://api.themoviedb.org/3';
  private readonly apiKey = process.env.APP_ACCESS_TOKEN;
  private readonly logger = new Logger(MoviesService.name);

  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  async getMovie(movieId: string): Promise<Movie> {
    const url = `${this.tmdbApiUrl}/movie/${movieId}?language=en-US`;

    try {
      const result = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        }),
      );

      this.logger.log(`GET ${url} with status ${result.status}`);
      return result.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch movie data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async searchMovies(searchTerm: string): Promise<Movies[]> {
    const url = `${this.tmdbApiUrl}/search/movie?query=${searchTerm}`;

    try {
      const result = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        }),
      );
      this.logger.log(`GET ${url} with status ${result.status}`);

      return result.data;
    } catch (error) {
      throw new HttpException(
        'Failed to search movies',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async listMovies(
    searchType: string,
    page: number,
  ): Promise<{ results: Movies[]; total_pages: number }> {
    const url = `${this.tmdbApiUrl}/movie/${searchType}?language=en-US&page=${page}`;

    try {
      const result = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
        }),
      );
      this.logger.log(`GET ${url} with status ${result.status}`);

      return {
        results: result.data.results,
        total_pages: result.data.total_pages,
      };
    } catch (error) {
      throw new HttpException('Failed to list movies', HttpStatus.BAD_REQUEST);
    }
  }

  // get favourite movies from Prisma
  //
  async listFavMovies(userId: number) {
    const favMovies = await this.prisma.movie.findMany({
      where: {
        userMovies: {
          every: {
            user_id: userId,
          },
        },
      },
    });

    return { results: favMovies };
  }

  async saveFavMovie(
    userId: number,
    input: { movie: string; movieId: number },
  ) {
    const movie = await this.prisma.movie.findFirst({
      where: {
        movie_id: input.movieId,
      },
      include: {
        userMovies: true,
      },
    });

    if (movie) {
      const userMovie = movie.userMovies.find(
        (element) => element.user_id === userId,
      );
      await this.prisma.userMovie.upsert({
        where: {
          id: userMovie.id,
        },
        create: {
          createdAt: new Date(),
          user_id: userId,
          movie_id: movie.id,
        },
        update: {
          deletedAt: null,
        },
      });
      return { status: 'Ok' };
    }

    this.prisma.movie.create({
      data: {
        movie_id: input.movieId,
        name: input.movie,
        userMovies: {
          // @ts-expect-error
          create: {
            user_id: userId,
          },
        },
      },
    });
    return { status: 'Ok' };
  }
}
