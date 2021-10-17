import React from 'react';
import {Table} from 'antd';
import DataNotFoundSVG from '../../assets/images/data-not-found.svg';

const locale = {
    emptyText: (
        <div style={{ padding: '50px' }}>
            <img src={DataNotFoundSVG} alt="bizzy-logo" />
            <p
                style={{
                    marginTop: '20px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#000000',
                }}
            >
                No result data
      </p>
            <p>
                The filter also helpful for quickly finding issues most relevant for
                you.
      </p>
        </div>
    ),
};

function TableList(props) {
    const { loading = false } = props
    return (
        <div
            style={{
                overflow: 'auto',
                tableLayout: 'auto !important',
                display: 'block',
                width: '100%',
                height: '100%'
            }}
        >
            <Table
                locale={locale}
                bordered
                pagination={false}
                style={{
                    backgroundColor: 'white',
                    marginBottom: 20
                }}
                {...props}
                loading={loading}
            />
        </div>
    );
}

export default TableList;