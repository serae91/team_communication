import './BLLabelChip.scss';

interface BLLabelChipProps {
  label: string;
}

const BLLabelChip = ({label}: BLLabelChipProps) => {
  return (
    <div className={ 'label-chip' }>{ label }</div>
  );
};

export default BLLabelChip;