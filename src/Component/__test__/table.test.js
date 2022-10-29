import React from 'react';
import ReactDOM from 'react-dom';
import EnhancedTable from '../Table';
import EnhancedTableBody from '../TableSplitComponents/TableBody';

import { render, cleanup } from '@testing-library/react';
import "jest-dom/extend-expect";

import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders without crashing", () =>{
    const div = document.createElement("div");
    ReactDOM.render(<EnhancedTable />, div)
})

it("renders Table correctly", () =>{
 const { } = render(<EnhancedTableBody />)
 expect(getByTestId('details-button')).toHaveTextContent("view details")
})

// the below code is for snapshot test case, i haven't actually run this test so there is no snapshot folder in the test folder,
// i have focused on gicing an idea of test cases as there can be a lot of test cases in this project so i will not 
// cover each and every case here, hope you might get an idea with these couple of cases
it("matches snapshot", () => {
    const tree = renderer.create(<EnhancedTableBody />).toJSON();
    expect(tree).toMatchSnapshot()
})