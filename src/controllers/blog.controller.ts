import axios from 'axios';
import { Request, Response } from 'express';
import _ from 'lodash';

import log from '../configs/logger.config';
import IBlog from '../interfaces/blog.interface';

class BlogController {
    blogStats = async (req: Request, res: Response) => {
        try {
            // Fectching data from api
            const data = await axios.get(
                'https://intent-kit-16.hasura.app/api/rest/blogs',
                {
                    headers: {
                        'x-hasura-admin-secret': process.env.API_KEY
                    }
                }
            );

            const blogs: IBlog[] = data.data.blogs;

            const statistics: any = this.statistics(blogs);

            log.info('not cached');

            // API response
            res.status(200).json({
                message: 'Blogs Statistics',
                data: statistics
            });
        } catch (error: any) {
            log.error(error.message);
            res.status(500).json({ message: error.message });
        }
    };

    blogSearch = async (req: Request<{}, {}, {}, string>, res: Response) => {
        try {
            // Extracting query parameter
            const searchKey: any = req.query.search;

            // Fectching data from api
            const data = await axios.get(
                'https://intent-kit-16.hasura.app/api/rest/blogs',
                { headers: { 'x-hasura-admin-secret': process.env.API_KEY } }
            );

            const blogs: IBlog[] = data.data.blogs;

            // Performing analysis on the data
            const searchResults: IBlog[] = _.filter(blogs, (blog) =>
                _.includes(blog.title, searchKey)
            );

            // API response
            res.status(200).json({
                message: 'Search results',
                data: searchResults
            });
        } catch (error: any) {
            log.error(error.message);
            res.status(500).json({ message: error });
        }
    };

    private statistics = (blogs: IBlog[]) => {
        // Performing analysis on the data
        let statistics: any = {};

        statistics['total blogs'] = _.size(blogs);
        statistics['longest title blog'] = _.maxBy(
            blogs,
            (blog) => blog.title.length
        );
        statistics['blogs containing the word privacy'] = _.filter(
            blogs,
            (blog) => _.includes(blog.title.toLowerCase(), 'privacy')
        );
        statistics['Unique Blogs'] = _.uniqBy(blogs, 'title');

        return statistics;
    };
}

export default BlogController;
