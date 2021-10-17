import React, { Component } from "react";
import StyleWrapper from "../../../utils/doPageWrapper.style";
import LayoutContentWrapper from "../../../utils/layoutWrapper";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

class tambahHargaPerikanan extends Component {

  render() {
    return (
      <StyleWrapper>
        <LayoutContentWrapper style={{ height: "auto" }}>
          <div>tambah perikanan</div>
          {/* {this.mapListHargaPerikanan()} */}
        </LayoutContentWrapper>
      </StyleWrapper>
    );
  }
}

export default connect(mapStateToProps)(tambahHargaPerikanan);
