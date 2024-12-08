import React from 'react';

const DashboardContainer = ({ title, component: Component, props, className = 'col-md-6'  }: any) => {
    return (
        <div className={className}>
            <div className="container-style">
                <h3>{title}</h3>
                <Component {...props}/>
            </div>
        </div>
    );
};

export default DashboardContainer;
