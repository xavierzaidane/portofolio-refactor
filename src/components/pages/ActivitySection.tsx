"use client";

import React from 'react'
import { eachDayOfInterval, endOfYear, formatISO, startOfYear } from "date-fns";
import { motion } from 'motion/react';
import { ContributionGraph, ContributionGraphBlock, ContributionGraphCalendar, ContributionGraphFooter } from '../kibo-ui/contribution-graph';
import { cn } from '@/lib/utils';


const maxCount = 20;
const maxLevel = 4;
const now = new Date();
const days = eachDayOfInterval({
  start: startOfYear(now),
  end: endOfYear(now),
});

const data = days.map((date) => {
  const c = Math.round(
    Math.random() * maxCount - Math.random() * (0.8 * maxCount)
  );
  const count = Math.max(0, c);
  const level = Math.ceil((count / maxCount) * maxLevel);

  return {
    date: formatISO(date, { representation: "date" }),
    count,
    level,
  };
});

function ActivitySection() {
  return (
    <section id="activity" className="container mx-auto px-4 py-20 border-t border-foreground/10 dark:border-white/10">
      <div className="-mt-7 mb-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Label */}
          <div className="lg:col-span-3">
            <span className="text-sm font-mono uppercase text-foreground/60">
              Activity
            </span>
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-12 lg:col-span-9">
            {/* Description */}
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-[1.90rem] font-light tracking-tight text-foreground/60 dark:text-foreground/60 max-w-3xl"
            >
              A visual record of <span className="text-foreground font-normal">consistency </span>and commitment to <span className="text-foreground font-normal">engineering </span>excellence.
            </motion.h3>
            
            {/* Contribution Graph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <ContributionGraph className="" data={data}>
                <ContributionGraphCalendar className="font-mono tracking-widest text-foreground/80">
                  {({ activity, dayIndex, weekIndex }) => (
                  
                      <ContributionGraphBlock
                        activity={activity}
                        className={cn(
                           'data-[level="0"]:fill-[#c0c1c3] dark:data-[level="0"]:fill-[#161b22]',
            'data-[level="1"]:fill-[#9be9a8] dark:data-[level="1"]:fill-[#0e4429]',
            'data-[level="2"]:fill-[#40c463] dark:data-[level="2"]:fill-[#006d32]',
            'data-[level="3"]:fill-[#30a14e] dark:data-[level="3"]:fill-[#26a641]',
            'data-[level="4"]:fill-[#216e39] dark:data-[level="4"]:fill-[#39d353]'
                        )}
                        dayIndex={dayIndex}
                        weekIndex={weekIndex}
                      />
      
                  )}
                </ContributionGraphCalendar>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <ContributionGraphFooter />
                </motion.div>
              </ContributionGraph>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ActivitySection