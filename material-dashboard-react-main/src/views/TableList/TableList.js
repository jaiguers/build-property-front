import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);

const tablHead = [" Name", "Address", "Price", "Code", "Year", "Owner"];
var tblData = [];

const fetchProp = async () => {
  const response = await fetch(
    "http://localhost:6288/api/property/getProperties"
  );
  const data = await response.json();

  return data;
};

fetchProp().then((res) => {
  console.log(res);

  if (res.status == 200 && res.title == "") {
    for (var data in res.result) {
      const dArray = [
        res.result[data].name,
        res.result[data].address,
        res.result[data].price + "",
        res.result[data].internalCode,
        res.result[data].year + "",
        res.result[data].owner.name,
      ];

      tblData[data] = dArray;
    }
  }

  // console.log(tblData);
});

export default function TableList() {
  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Real Estate</h4>
            <p className={classes.cardCategoryWhite}>
              Lista de propiedades en los Estados Unidos
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={tablHead}
              tableData={tblData}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
