// @ts-nocheck

const Component = () => {
  return (
    <>
      <Text color="gray100" variant="subtitle2Regular" className="text-ellipsis-2" />
      <Text color="gray700" variant="subtitle2Regular" className="text-ellipsis-2" />
      <Text color="orange100" variant="subtitle2Regular" className="text-ellipsis-2" />
      <Text color="orange500" variant="subtitle2Regular" className="text-ellipsis-2" />
      <Text color="orange700" variant="subtitle2Regular" className="text-ellipsis-2" />
      <Text color="orange900" variant="subtitle2Regular" className="text-ellipsis-2" />
      <Text color="staticBlack" variant="subtitle2Regular" className="text-ellipsis-2" />
      <Text color="staticWhite" variant="subtitle2Regular" className="text-ellipsis-2" />
      <Text color="onPrimary" variant="subtitle2Regular" className="text-ellipsis-2" />
      <Text color={isSelected ? "onPrimary" : "primary"} />
      <Text color={isSelected ? 'primary' : 'gray900'}  />
      <Text color={isSelected ? 'orange600' : 'blue600'}  />
    </>
  );
};
