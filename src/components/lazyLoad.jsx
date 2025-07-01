import React, { useState, useEffect } from "react";

export default function LazyLoad(props) {
    const { loadFunc } = props;
    const [ResultComponent, setResultComponent] = useState(() => () => <Loading />);
    const [error, setError] = useState(false);

    useEffect(() => {
        let mounted = true;
        loadFunc()
            .then(res => {
                if (mounted) setResultComponent(() => res);
            })
            .catch(err => {
                if (mounted) setError(true);
            });
        return () => { mounted = false; };
    }, [loadFunc]);

    if (error) return <Error />;
    return <ResultComponent />;
}

function Loading() {
    return <div>加载中...</div>;
}
function Error() {
    return <div>加载失败</div>;
}