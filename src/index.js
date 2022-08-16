import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "@grapecity/activereports/styles/ar-js-ui.css";
import "@grapecity/activereports/styles/ar-js-viewer.css";
import { Viewer } from "@grapecity/activereports-react";
import "@grapecity/activereports/pdfexport";
import "@grapecity/activereports/htmlexport";
import "@grapecity/activereports/xlsxexport";
import { Core } from "@grapecity/activereports";
import {} from "./arjs-license";

const exportsSettings = {
  pdf: {
    title: "ActiveReportsJS Sample",
    author: "GrapeCity",
    subject: "Web Reporting",
    keywords: "reporting, sample",
    printing: "none",
    copying: false,
    modifying: false,
    annotating: false,
    contentAccessibility: false,
    documentAssembly: false,
    pdfVersion: "1.7",
    autoPrint: false,
    filename: "ActiveReportsJS-Sample",
  },
};

async function downloadFonts() {
  await Core.FontStore.registerFonts("assets/fontsConfig.json");
  console.log("Fonts Registered");
}

function App() {
  const [allExports, setAllExports] = React.useState([
    { label: "PDF", value: "pdf", available: true },
  ]);
  downloadFonts();
  function onCheckedChange(expValue) {
    setAllExports((val) =>
      val.map((exp) => {
        if (exp.value === expValue)
          return { ...exp, available: !exp.available };
        return { ...exp };
      })
    );
  }
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="form-group mb-3 mt-3">
          <div>
            <label>Select available Exports: </label>
          </div>
          {allExports.map((exp) => (
            <div className="form-check form-check-inline" key={exp.value}>
              <input
                className="form-check-input"
                type="checkbox"
                checked={exp.available}
                onChange={() => onCheckedChange(exp.value)}
              />
              <label className="form-check-label">{exp.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div id="viewer-host">
        <Viewer
          report={{
            Uri: "reports/California/CA Crash/CA Crash Property Damage.rdlx-json",
          }}
          exportsSettings={exportsSettings}
          availableExports={allExports
            .filter((exp) => exp.available)
            .map((exp) => exp.value)}
          sidebarVisible={true}
        />
      </div>
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
