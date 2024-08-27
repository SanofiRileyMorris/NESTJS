import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Movie, Movies } from './movie.interface';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class MoviesService {
    private readonly tmdbApiUrl = 'https://api.themoviedb.org/3';
    private readonly apiKey = process.env.REACT_APP_ACCESS_TOKEN;
    private readonly logger = new Logger(MoviesService.name);

    constructor(private readonly httpService: HttpService) { }

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

            throw new HttpException('Failed to fetch movie data', HttpStatus.BAD_REQUEST);
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
            throw new HttpException('Failed to search movies', HttpStatus.BAD_REQUEST);
        }
    }

    async listMovies(searchType: string, page: number): Promise<{ results: Movies[]; total_pages: number }> {
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

            return { results: result.data.results, total_pages: result.data.total_pages };
        } catch (error) {
            throw new HttpException('Failed to list movies', HttpStatus.BAD_REQUEST);
        }
    }
}

