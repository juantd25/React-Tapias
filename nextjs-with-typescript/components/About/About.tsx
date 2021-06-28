import Alert from "components/common/Alert";
import Checkbox from "components/common/Checkbox";
import RadioButton from "components/common/RadioButton";
import Toggle from "components/common/Toggle";
import Image from "next/image";

export default function About() {
  return (
    <div className="flex">
      <div className="sm:container lg:container lg:mx-auto h-screen flex flex-col border border-black pt-10 px-5 mb-10">
        <button className="bg-neutralBg rounded-lg top-6 left-5 w-9 h-9 mr-6 justify-center items-center p-1 flex">
          <Image className="transform " src="/icons/flecha.svg" width={25} height={25} />
        </button>
        <p className="mt-6 font-bold text-left text-2xl text-primary00">Ingresa tu documento de identidad</p>
        <p className="mt-6 text-left text-base">
          Ingresa tu tipo y número de documento para poder continuar con el registro.
        </p>
        <div className="flex flex-row w-80 mt-8">
          <div
            className="bg-white w-1/4 py-3 px-4 border-l border-t border-b border-r-0 rounded-r-none border-neutral50
          rounded-l-lg text-neutral80">
            <div className="flex flex-row">
              <div>
                <p>CC</p>
              </div>
              <div>
                <button className="justify-center items-center p-1 flex">
                  <Image className="transform -rotate-90" src="/icons/flecha.svg" width={25} height={25} />
                </button>
              </div>
            </div>
          </div>
          <input
            className="bg-white w-3/4 py-3 px-4 border-r border-t border-b border-neutral50 rounded-r-lg text-neutral80"
            type="text"
            placeholder="Número documento"
            name="input"
          />
        </div>
        <button
          type="button"
          className="bg-primary00 px-8 py-4 w-80 h-14 rounded-xl mt-6 text-base text-neutral00 hover:bg-primaryDark40">
          Iniciar sesión
        </button>
      </div>
      <div className="sm:container lg:container lg:mx-auto h-screen flex flex-col border border-black pt-10 px-5 mb-10">
        <Alert size="sm" success title={"Mensaje de exito con texto plano"} />
        <br />
        <Alert size="mb" information title={"Mensaje de info con texto plano"} />
        <br />
        <Alert
          size="lg"
          warning
          body={"Cuerpo de mensaje de alerta donde se amplia más información de ser necesario"}
          title={"Mensaje de alerta con texto plano"}
        />
        <br />
        <Alert
          size="xl"
          error
          body={"Cuerpo de mensaje de alerta donde se amplia más información de ser necesario"}
          title={"Mensaje de error con texto plano"}
        />
        <br />
        <div className="flex">
          <div className="flex flex-col">
            <Checkbox id={"1"} labelText={"Label de Checkbox"} />
            <Checkbox disabled labelText={"Label de Checkbox"} />
            <Checkbox checked labelText={"Label de Checkbox"} />
            <Checkbox disabled checked labelText={"Label de Checkbox"} />
            <br />
            <Checkbox id={"2"} size="sm" labelText={"Label de Checkbox"} />
            <Checkbox size="sm" disabled labelText={"Label de Checkbox"} />
            <Checkbox size="sm" checked labelText={"Label de Checkbox"} />
            <Checkbox size="sm" disabled checked labelText={"Label de Checkbox"} />
            <br />
            <Toggle id={"5"} labelOnText="On" labelOffText="Off" />
            <br />
            <Toggle size="sm" disabled id={"6"} labelOnText="On" labelOffText="disabled" />
            <br />
            <Toggle checked id={"7"} labelOnText="On" labelOffText="Off" />
            <br />
            <Toggle size="sm" checked id={"8"} labelOnText="On" labelOffText="Off" />
          </div>
          <div className="flex flex-col">
            <RadioButton id={"3"} labelText={"Label de RadioButton"} />
            <RadioButton disabled labelText={"Label de RadioButton"} />
            <RadioButton checked labelText={"Label de RadioButton"} />
            <RadioButton checked disabled labelText={"Label de RadioButton"} />
            <br />
            <RadioButton id={"4"} size="sm" labelText={"Label de RadioButton"} />
            <RadioButton size="sm" disabled labelText={"Label de RadioButton"} />
            <RadioButton size="sm" checked labelText={"Label de RadioButton"} />
            <RadioButton size="sm" checked disabled labelText={"Label de RadioButton"} />
          </div>
        </div>
      </div>
    </div>
  );
}
