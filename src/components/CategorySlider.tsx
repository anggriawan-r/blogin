"use client";

import { ChevronLeft, ChevronRight, Compass } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

type Props = {
  id: string;
  slug: string;
  title: string;
  img: string | null;
}[];

export default function CategorySlider({ categories }: { categories: Props }) {
  return (
    <Swiper
      modules={[Navigation]}
      navigation={{
        prevEl: ".button-prev-slide",
        nextEl: ".button-next-slide",
      }}
      spaceBetween={10}
      slidesPerView={2.25}
      breakpoints={{
        640: {
          slidesPerView: 3.25,
        },
        1024: {
          slidesPerView: 5.25,
        },
      }}
      className="group/visibility relative h-16 w-full"
    >
      <div className="button-prev-slide group absolute left-0 top-1/2 z-10 flex h-full w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-l-md bg-gradient-to-r from-black/50 to-black/0 opacity-0 transition-all group-hover/visibility:opacity-100">
        <ChevronLeft
          className="transition group-hover:-translate-x-1"
          color="white"
        />
      </div>
      <div className="button-next-slide group absolute right-0 top-1/2 z-10 flex h-full w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-r-md bg-gradient-to-l from-black/50 to-black/0 opacity-0 transition-all group-hover/visibility:opacity-100">
        <ChevronRight
          className="transition group-hover:translate-x-1"
          color="white"
        />
      </div>

      <SwiperSlide>
        <button className="flex h-full w-full items-center justify-center gap-2 rounded-md bg-gray-200 text-xs transition duration-500 ease-out hover:bg-orange-500/20 hover:text-orange-600 sm:text-sm">
          <Compass className="h-5 w-5 sm:h-6 sm:w-6" />
          <Link href="/category" className="whitespace-nowrap">
            More Categories
          </Link>
        </button>
      </SwiperSlide>
      {categories.map((category) => (
        <SwiperSlide key={category.id}>
          <Link
            href={`/category/${category.slug}`}
            className="group relative flex h-full items-center justify-center gap-2 overflow-hidden rounded-md bg-black/60 text-sm font-semibold text-white transition duration-500 ease-out hover:bg-black/40 sm:text-base"
          >
            {category.title}

            {category.img && (
              <Image
                src={category.img}
                alt="category image"
                fill
                sizes="(min-width: 1024px) 33vw, 20vw"
                className="absolute -z-10 object-cover transition-transform duration-500 ease-out group-hover:scale-125"
              />
            )}
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
