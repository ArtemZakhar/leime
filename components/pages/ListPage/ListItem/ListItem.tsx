import { MemeType } from '@/types/mems';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Image } from '@heroui/image';
import { Link } from '@heroui/link';
import { Tooltip } from '@heroui/tooltip';

import { useEffect, useRef, useState } from 'react';

const ListItem = ({ meme, index }: { meme: MemeType; index: number }) => {
  const { id, likes, title, imageURL } = meme;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const element = titleRef.current;
    if (element) {
      setIsOverflowing(element.scrollWidth > element.clientWidth);
    }
  }, [title]);

  return (
    <Link
      className="py-4 col-span-6 sm:col-span-3"
      isExternal
      aria-label={title}
      href={imageURL}
    >
      <Card>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">Meme #{index + 1}</p>
          <small className="text-default-500">{` ${likes}`} Likes</small>

          {isOverflowing ? (
            <Tooltip content={title}>
              <h4
                ref={titleRef}
                className="font-bold text-large truncate w-full cursor-pointer"
              >
                {title}
              </h4>
            </Tooltip>
          ) : (
            <h4 ref={titleRef} className="font-bold text-large truncate w-full">
              {title}
            </h4>
          )}
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt={`${title} image`}
            className="object-cover rounded-xl"
            src={imageURL}
            width={270}
            height={270}
          />
        </CardBody>
      </Card>
    </Link>
  );
};

export default ListItem;
