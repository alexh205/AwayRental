import {differenceInCalendarDays, format} from 'date-fns';
import {BsMoonStars} from 'react-icons/bs';
import {IoCalendarOutline} from 'react-icons/io5';

const BookingDates = ({booking, className}) => {
  return (
    <div className={'flex gap-1 ' + className}>
      <BsMoonStars className="sm:w-6 w-5 sm:h-6 h-5" />
      {differenceInCalendarDays(
        new Date(booking.endDate),
        new Date(booking.startDate)
      )}{' '}
      nights:
      <div className="flex gap-1 items-center ml-2">
        <IoCalendarOutline className="w-6 h-6" />

        {format(new Date(booking.startDate), 'dd-MM-yyyy')}
      </div>
      &rarr;
      <div className="flex gap-1 items-center">
        <IoCalendarOutline className="w-6 h-6" />

        {format(new Date(booking.endDate), 'dd-MM-yyyy')}
      </div>
    </div>
  );
};

export default BookingDates;
