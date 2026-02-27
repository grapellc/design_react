// @ts-nocheck

export function ModifierExample() {
    return (
      <div>
        <div className="!bg-primary">Primary Background</div>
        <div className="!bg-primaryLow">Primary Low Background</div>
        <div className="hover:!bg-primaryLow">Hover Primary Low Background</div>
        <div className="focus:!bg-primaryLow">Focus Primary Low Background</div>
        <div className="active:!bg-primaryLow">Active Primary Low Background</div>
        <div className="!bg-gray500">Scale Background</div>
        <div className="dark:bg-orange100">Scale Carrot Low Background</div>
        <div className="light:bg-orange200">Scale Carrot Mid Background</div>
        <div className="dark:bg-orange300">Scale Carrot High Background</div>
        <div className="light:bg-orange400">Scale Carrot High Background</div>
        <div className="dark:bg-orange500">Scale Carrot High Background</div>
        <div className="sm:bg-orange600">Scale Carrot High Background</div>
        <div className="md:bg-orange700">Scale Carrot High Background</div>
        <div className="lg:bg-orange800">Scale Carrot High Background</div>
        <div className="xl:bg-orange900">Scale Carrot High Background</div>
        <div className="!bg-orange900">Scale Carrot High Background</div>
        <div className="first:bg-staticBlack">Static Black Background</div>
        <div className="last:bg-staticWhite">Static White Background</div>
        <div className="odd:bg-staticGray900">Static Gray900 Background</div>
      </div>
    );
  }
  