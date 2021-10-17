import React, { Component } from "react";
import StyleWrapper from "../../../utils/doPageWrapper.style";
import LayoutContentWrapper from "../../../utils/layoutWrapper";
import { columnHargaIkan } from "./column_harga_ikan";
import Table from "../../../components/Table/list_table";
import Pagination from "../../../components/Pagination/pagination";
import { connect } from "react-redux";
import products from "../../../config/redux/action";

const { apiHargaPerikananFetch, apiHargaPerikananPost, apiHargaPerikananPut, apiHargaPerikananDelete} = products;

const mapStateToProps = (state) => ({
  data: state.hargaPerikananReducer.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHargaPerikanan: () => dispatch(apiHargaPerikananFetch()),
  postHargaPerikanan: () => dispatch(apiHargaPerikananPost()),
  putHargaPerikanan: () => dispatch(apiHargaPerikananPut()),
  deleteHargaPerikanan: () => dispatch(apiHargaPerikananDelete()),
});

class listHargaPerikanan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const { props } = this;
    const { fetchHargaPerikanan } = props;
    fetchHargaPerikanan();
  }

  componentDidUpdate(props) {
    if (this.props.data !== props.data) {
      // console.log(props.data, 9999);
    }
  }

  mapListHargaPerikanan() {
    const { data } = this.props;
    if (data !== undefined) {
      data.then((result) => {
        this.setState({ data: result });
      });
    }
  }

  mapTableHargaPerikanan = () => {
    const { props } = this;
    const dataHargaPerikanan = props.data
      .filter((f) => f.uuid !== null)
      .map((data, index) => {
        return {
          ...data,
          key: `id${index}`,
        };
      });
    return (
      <Table
        dataSource={dataHargaPerikanan}
        columns={columnHargaIkan}
        scroll={{ x: 2000, y: 500 }}
        footer={() => (
          <Pagination
            showTotal={(total, range) =>
              `Showing ${range[0]} to ${range[1]} of ${total} items`
            }
            size="medium"
            showSizeChanger
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
            onChange={this.onChangePagination}
            pageSizeOptions={["10", "20", "30", "50"]}
            total={200}
          />
        )}
      />
    );
  };

  render() {
    return (
      <StyleWrapper>
        <LayoutContentWrapper style={{ height: "auto" }}>
          {/* {console.log("render")} */}
          {this.mapTableHargaPerikanan()}
        </LayoutContentWrapper>
      </StyleWrapper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(listHargaPerikanan);
