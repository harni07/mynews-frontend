import LoadingSpinner from "../spinner";

const DataLoadHandler = ({ isLoading, isError, children }: any) => {
    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <p>An Error occurred</p>;
    }

    return children;
};

export default  DataLoadHandler
