import React, { MutableRefObject, useRef, useState } from "react";
import { InputField } from "./components/InputField";
// import { QRCode } from "react-qrcode-logo";
import { SelectField } from "./components/SelectField";
import { TextArea } from "./components/TextArea";
import { ImageUploadField } from "./components/ImageUploadField";
import { CheckboxField } from "./components/CheckboxField";
import ReactJson from "react-json-view";
import { QRCode } from "./components/react-qrcode-logo-master/dist";
import html2canvas from "html2canvas";

const App: React.FC = () => {
  const [state, setState] = useState<{ [key: string]: any }>({
    value: "agile.com",
    ecLevel: "H",
    size: "300",
    quietZone: "20",
    logoWidth: "100",
    qrStyle: "tetris",
    logoPaddingStyle: "circle",
    eyeradius_0_outer_0: "20",
    eyeradius_0_outer_1: "20",
    eyeradius_0_outer_2: "20",
    eyeradius_0_outer_3: "20",
    eyeradius_0_inner_0: "10",
    eyeradius_0_inner_1: "10",
    eyeradius_0_inner_2: "10",
    eyeradius_0_inner_3: "10",
    eyeradius_1_outer_0: "20",
    eyeradius_1_outer_1: "20",
    eyeradius_1_outer_2: "20",
    eyeradius_1_outer_3: "20",
    eyeradius_1_inner_0: "10",
    eyeradius_1_inner_1: "10",
    eyeradius_1_inner_2: "10",
    eyeradius_1_inner_3: "10",
    eyeradius_2_outer_0: "20",
    eyeradius_2_outer_1: "20",
    eyeradius_2_outer_2: "20",
    eyeradius_2_outer_3: "20",
    eyeradius_2_inner_0: "10",
    eyeradius_2_inner_1: "10",
    eyeradius_2_inner_2: "10",
    eyeradius_2_inner_3: "10",
    removeQrCodeBehindLogo: true,
    fgColor: "#6db2e2",
    bgColor: "#ffffff",
    eyecolor_0_outer: "#f15928",
    eyecolor_1_outer: "#f15928",
    eyecolor_2_outer: "#f15928",
    eyecolor_0_inner: "#f15928",
    eyecolor_1_inner: "#f15928",
    eyecolor_2_inner: "#f15928",
	title: "Title",
	titleTopPadding: 10,
	titleColor: "#ffffff",
	titleFontWeight: 700,
	titleFontSize: 36,
	titleAlignment: "center",
	desc: "Description",
	descColor: "#ffffff",
	descFontWeight: 400,
	descFontSize: 27,
	descAlignment: "center",
	cardColor: "#000000",
	cardBorder: 20,
	cardHeight: 460,
	qrPadding: 20,
	fontFamily: "Roboto",
  });
  const ref = useRef<QRCode>();

  const handleChange = ({ target }: any) => {
    setState((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSyncEye = (target: string) => {
    var currentState = state;
    if (target == "outer") {
      setState((prevState) => ({
        ...prevState,
        ["eyecolor_1_outer"]: currentState.eyecolor_0_outer,
        ["eyecolor_2_outer"]: currentState.eyecolor_0_outer,
      }));
    }
    if (target == "inner") {
		setState((prevState) => ({
		  ...prevState,
		  ["eyecolor_1_inner"]: currentState.eyecolor_0_inner,
		  ["eyecolor_2_inner"]: currentState.eyecolor_0_inner,
		}));
    }
  };

  const handleDownload = () => {
    ref.current?.download();
  };

  const buildEyeRadiusInput = (id: string) => {
    return (
      <InputField
        name={id}
        type="number"
        handleChange={handleChange}
        min={0}
        max={50}
        hideLabel
        defaultValue={(state as any)[id]}
      />
    );
  };

  const divRef = useRef(null);

  const handleDownloadImage = () => {
    if (divRef.current) {
      html2canvas(divRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = state.title.replaceAll(" ", "") + "_QRContact.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };

  return (
    <div className="app">
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <div style={{ width: "240px", display: "flex", flexDirection: "column", padding: "15px" }}>
              <TextArea
                name="title"
                handleChange={handleChange}
                defaultValue={state.title}
              />
              <InputField
                name="titleFontWeight"
                type="number"
                handleChange={handleChange}
                min={100}
                max={1000}
                step={100}
                defaultValue={state.titleFontWeight}
              />{" "}
              <InputField
                name="titleFontSize"
                type="number"
                handleChange={handleChange}
                defaultValue={state.titleFontSize}
              />
              <InputField
                name="titleColor"
                type="color"
                defaultValue={state.titleColor}
                handleChange={handleChange}
              />
              <SelectField
                name="titleAlignment"
                options={["center", "left", "right"]}
                handleChange={handleChange}
              />
              <SelectField
                name="fontFamily"
                options={[
                  "Roboto",
                  "Poppins",
                  "Inter",
                  "Times New Roman",
                  "Georgia",
                  "Garamond",
                  "Arial",
                  "Verdana",
                  "Tahoma",
                  "Courier New",
                  "Lucida Console",
                  "Monaco",
                  "Brush Script MT",
                  "Lucida Handwriting",
                  "Copperplate",
                  "Papyrus",
                ]}
                handleChange={handleChange}
              />
              <TextArea
                name="desc"
                handleChange={handleChange}
                defaultValue={state.desc}
              />
              <InputField
                name="descFontWeight"
                type="number"
                handleChange={handleChange}
                min={100}
                max={1000}
                step={100}
                defaultValue={state.descFontWeight}
              />{" "}
              <InputField
                name="descFontSize"
                type="number"
                handleChange={handleChange}
                defaultValue={state.descFontSize}
              />
              <InputField
                name="descColor"
                type="color"
                defaultValue={state.descColor}
                handleChange={handleChange}
              />
              <SelectField
                name="descAlignment"
                options={["center", "left", "right"]}
                handleChange={handleChange}
              />
              <InputField
                name="cardColor"
                type="color"
                defaultValue={state.cardColor ?? "#000000"}
                handleChange={handleChange}
              />
              <InputField
                name="cardBorder"
                type="number"
                handleChange={handleChange}
                min={0}
                max={5000}
                defaultValue={state.cardBorder}
              />
              <InputField
                name="titleTopPadding"
                type="number"
                handleChange={handleChange}
                min={0}
                max={5000}
                defaultValue={state.titleTopPadding}
              />
              <InputField
                name="cardHeight"
                type="number"
                handleChange={handleChange}
                min={0}
                max={5000}
                defaultValue={state.cardHeight}
              />
              <InputField
                name="qrPadding"
                type="number"
                handleChange={handleChange}
                min={0}
                max={5000}
                defaultValue={state.qrPadding}
              />
              <div style={{ padding: "15px" }}>
                <p>eyeRadius</p>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <p style={{ fontSize: 14 }}>Top left eye</p>
                    <p style={{ fontSize: 12 }}>Outer</p>
                    {buildEyeRadiusInput("eyeradius_0_outer_0")}
                    {buildEyeRadiusInput("eyeradius_0_outer_1")}
                    {buildEyeRadiusInput("eyeradius_0_outer_2")}
                    {buildEyeRadiusInput("eyeradius_0_outer_3")}
                    <p style={{ fontSize: 12 }}>Inner</p>
                    {buildEyeRadiusInput("eyeradius_0_inner_0")}
                    {buildEyeRadiusInput("eyeradius_0_inner_1")}
                    {buildEyeRadiusInput("eyeradius_0_inner_2")}
                    {buildEyeRadiusInput("eyeradius_0_inner_3")}
                  </div>
                  <div>
                    <p style={{ fontSize: 14 }}>Top right eye</p>
                    <p style={{ fontSize: 12 }}>Outer</p>
                    {buildEyeRadiusInput("eyeradius_1_outer_0")}
                    {buildEyeRadiusInput("eyeradius_1_outer_1")}
                    {buildEyeRadiusInput("eyeradius_1_outer_2")}
                    {buildEyeRadiusInput("eyeradius_1_outer_3")}
                    <p style={{ fontSize: 12 }}>Inner</p>
                    {buildEyeRadiusInput("eyeradius_1_inner_0")}
                    {buildEyeRadiusInput("eyeradius_1_inner_1")}
                    {buildEyeRadiusInput("eyeradius_1_inner_2")}
                    {buildEyeRadiusInput("eyeradius_1_inner_3")}
                  </div>
                  <div>
                    <p style={{ fontSize: 14 }}>Bottom left eye</p>
                    <p style={{ fontSize: 12 }}>Outer</p>
                    {buildEyeRadiusInput("eyeradius_2_outer_0")}
                    {buildEyeRadiusInput("eyeradius_2_outer_1")}
                    {buildEyeRadiusInput("eyeradius_2_outer_2")}
                    {buildEyeRadiusInput("eyeradius_2_outer_3")}
                    <p style={{ fontSize: 12 }}>Inner</p>
                    {buildEyeRadiusInput("eyeradius_2_inner_0")}
                    {buildEyeRadiusInput("eyeradius_2_inner_1")}
                    {buildEyeRadiusInput("eyeradius_2_inner_2")}
                    {buildEyeRadiusInput("eyeradius_2_inner_3")}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "320px", display: "flex", flexDirection: "column", padding: "15px" }}>
              <TextArea name="value" handleChange={handleChange} defaultValue={"agileap.com"} />
              <SelectField name="ecLevel" options={["H", "L", "M", "Q"]} handleChange={handleChange} />
              <CheckboxField name="enableCORS" handleChange={handleChange} />
              <InputField name="size" type="number" handleChange={handleChange} min={0} max={500} defaultValue={300} />
              <InputField
                name="quietZone"
                type="number"
                handleChange={handleChange}
                min={0}
                max={80}
                defaultValue={20}
              />
              <div style={{ display: "flex", flexDirection: "row", marginTop: "4px", justifyContent: "space-around" }}>
                <InputField name="bgColor" type="color" defaultValue={state.bgColor ?? "#ffffff"} handleChange={handleChange} />
                <InputField name="fgColor" type="color" defaultValue={state.fgColor ?? "#000000"} handleChange={handleChange} />
              </div>
              <ImageUploadField name="logoImage" handleChange={handleChange} />
              <InputField
                name="logoWidth"
                type="number"
                handleChange={handleChange}
                min={0}
                max={500}
                defaultValue={100}
              />
              <InputField name="logoHeight" type="number" handleChange={handleChange} min={0} max={500} />
              <InputField
                name="logoOpacity"
                type="range"
                handleChange={handleChange}
                min={0}
                max={1}
                step={0.1}
                defaultValue={1}
              />
              <SelectField
                name="qrStyle"
                options={["tetris", "squares", "dots", "extraDots", "fluid"]}
                handleChange={handleChange}
              />
              <CheckboxField name="removeQrCodeBehindLogo" handleChange={handleChange} />
              <InputField
                name="logoPadding"
                type="range"
                handleChange={handleChange}
                min={0}
                max={20}
                step={1}
                defaultValue={0}
              />
              <SelectField name="logoPaddingStyle" options={["circle", "square"]} handleChange={handleChange} />
              <div style={{ padding: "15px" }}>
                <p>eyeColor</p>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div>
                    <p style={{ fontSize: 14 }}>Top left eye</p>
                    <p style={{ fontSize: 12 }}>Outer</p>
                    <InputField
                      name="eyecolor_0_outer"
                      type="color"
                      defaultValue={state.eyecolor_0_outer ?? "#000000"}
                      handleChange={handleChange}
                      hideLabel={true}
					  value={state.eyecolor_0_outer}
                    />
                    <p style={{ fontSize: 12 }}>Inner</p>
                    <InputField
                      name="eyecolor_0_inner"
                      type="color"
                      defaultValue={state.eyecolor_0_inner ?? "#000000"}
                      handleChange={handleChange}
                      hideLabel={true}
					  value={state.eyecolor_0_inner}
                    />
                  </div>
                  <div>
                    <p style={{ fontSize: 14 }}>Top right eye</p>
                    <p style={{ fontSize: 12 }}>Outer</p>
                    <InputField
                      name="eyecolor_1_outer"
                      type="color"
                      defaultValue={state.eyecolor_1_outer ?? "#000000"}
                      handleChange={handleChange}
                      hideLabel={true}
					  value={state.eyecolor_1_outer}
                    />
                    <p style={{ fontSize: 12 }}>Inner</p>
                    <InputField
                      name="eyecolor_1_inner"
                      type="color"
                      defaultValue={state.eyecolor_1_inner ?? "#000000"}
                      handleChange={handleChange}
                      hideLabel={true}
					  value={state.eyecolor_1_inner}
                    />
                  </div>
                  <div>
                    <p style={{ fontSize: 14 }}>Bottom left eye</p>
                    <p style={{ fontSize: 12 }}>Outer</p>
                    <InputField
                      name="eyecolor_2_outer"
                      type="color"
                      defaultValue={state.eyecolor_2_outer ?? "#000000"}
                      handleChange={handleChange}
                      hideLabel={true}
					  value={state.eyecolor_2_outer}
                    />
                    <p style={{ fontSize: 12 }}>Inner</p>
                    <InputField
                      name="eyecolor_2_inner"
                      type="color"
                      defaultValue={state.eyecolor_2_inner ?? "#000000"}
                      handleChange={handleChange}
                      hideLabel={true}
					  value={state.eyecolor_2_inner}
                    />
                  </div>
                  <div>
                    <p style={{ fontSize: 14 }}>Sync All</p>
                    <p style={{ fontSize: 12 }}>Outer</p>
                    <button type="button" onClick={() => handleSyncEye("outer")} style={{ margin: "10px" }}>
                      Sync
                    </button>
                    <p style={{ fontSize: 12 }}>Inner</p>
                    <button type="button" onClick={() => handleSyncEye("inner")} style={{ margin: "10px" }}>
                      Sync
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            paddingTop: "20px",
            paddingLeft: "0px",
            display: "flex",
            justifyContent: "center",
            width: 500,
            height: state.cardHeight + "px",
          }}
        >
          <div
            style={{
              border: "1px solid #fff",
              borderRadius: state.cardBorder + "px",
              backgroundColor: state.cardColor,
              padding: state.qrPadding + "px",
            }}
            ref={divRef}
          >
            <QRCode
              style={{
                border: "0px solid #000000",
                borderRadius: "15px",
              }}
              ref={ref as MutableRefObject<QRCode>}
              {...{
                ...state,
                eyeRadius: [
                  // build eyeRadius manually
                  {
                    outer: [
                      state.eyeradius_0_outer_0,
                      state.eyeradius_0_outer_1,
                      state.eyeradius_0_outer_2,
                      state.eyeradius_0_outer_3,
                    ],
                    inner: [
                      state.eyeradius_0_inner_0,
                      state.eyeradius_0_inner_1,
                      state.eyeradius_0_inner_2,
                      state.eyeradius_0_inner_3,
                    ],
                  },
                  {
                    outer: [
                      state.eyeradius_1_outer_0,
                      state.eyeradius_1_outer_1,
                      state.eyeradius_1_outer_2,
                      state.eyeradius_1_outer_3,
                    ],
                    inner: [
                      state.eyeradius_1_inner_0,
                      state.eyeradius_1_inner_1,
                      state.eyeradius_1_inner_2,
                      state.eyeradius_1_inner_3,
                    ],
                  },
                  {
                    outer: [
                      state.eyeradius_2_outer_0,
                      state.eyeradius_2_outer_1,
                      state.eyeradius_2_outer_2,
                      state.eyeradius_2_outer_3,
                    ],
                    inner: [
                      state.eyeradius_2_inner_0,
                      state.eyeradius_2_inner_1,
                      state.eyeradius_2_inner_2,
                      state.eyeradius_2_inner_3,
                    ],
                  },
                ],
                eyeColor: [
                  // build eyeColor manually
                  {
                    outer: state.eyecolor_0_outer ?? state.fgColor ?? "#000000",
                    inner: state.eyecolor_0_inner ?? state.fgColor ?? "#000000",
                  },
                  {
                    outer: state.eyecolor_1_outer ?? state.fgColor ?? "#000000",
                    inner: state.eyecolor_1_inner ?? state.fgColor ?? "#000000",
                  },
                  {
                    outer: state.eyecolor_2_outer ?? state.fgColor ?? "#000000",
                    inner: state.eyecolor_2_inner ?? state.fgColor ?? "#000000",
                  },
                ],
              }}
            />
            <div
              style={{
				paddingTop: state.titleTopPadding + "px",
                color: state.titleColor,
                fontWeight: state.titleFontWeight,
                fontSize: state.titleFontSize + "px",
                textAlign: state.titleAlignment == "left" ? "left" : state.titleAlignment == "center" ? "center" : "right",
                fontFamily: state.fontFamily,
              }}
            >
              {state.title}
            </div>
            <div
              style={{
                color: state.descColor,
                fontWeight: state.descFontWeight,
                fontSize: state.descFontSize + "px",
                textAlign: state.descAlignment == "left" ? "left" : state.descAlignment == "center" ? "center" : "right",
                fontFamily: state.fontFamily,
              }}
            >
              {state.desc}
            </div>
          </div>
        </div>
        <div>
          <div>
            <button type="button" onClick={handleDownload} style={{ margin: "10px" }}>
              Download QR Code
            </button>
          </div>
          <div>
            <button type="button" onClick={handleDownloadImage} style={{ margin: "10px" }}>
              Download as Image
            </button>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "15px" }}>
        <p>State snapshot (debug purposes)</p>
        <ReactJson src={state} style={{ marginBottom: 40 }} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 12 }}
        >
          Learn React
        </a>
      </div>
    </div>
  );
};

export default App;
