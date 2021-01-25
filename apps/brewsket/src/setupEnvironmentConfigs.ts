import { Container } from 'typedi';

Container.set('PATH', process.env.REACT_APP_API_CONTEXT_PATH);
Container.set('OTHER_PATH', process.env.REACT_APP_API_HOST);
