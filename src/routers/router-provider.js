import {ExampleRouter} from './example-router.js'

const exampleRouter = () => ExampleRouter.getInstance().getRouter();

export default {exampleRouter}