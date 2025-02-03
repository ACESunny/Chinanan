"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
// import postFPS from "../../../models/postFPS"

import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Database of APIs
const SelectAPIs = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
]

  
export default function APIs() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
      
    const [items, setItems] = useState([]);
    const [data, setData] = useState([]);

    function testaxios() {
        setItems([
            {id: 1, name: "Test API"},
        ])
          
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setData(response.data);
            }
        )
    }

    const [frames, setFrames] = useState([]);

    useEffect(() => {
        axios.get('/api/getData')
            .then(response => {
                setFrames(response.data);
            }
            
        )
    }, []);

    const [recordId, setRecordId] = useState('');
    const [frameNumber, setFrameNumber] = useState('');
    const [fps, setFps] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // ส่งข้อมูลไปยัง API Route โดยใช้ Axios
            const res = await axios.post('https://chinanan.in.th/api/sendData', {
                record_id: recordId,
                frame_number: frameNumber,
                fps: fps,
            });

            if (res.status === 201) {
                setMessage('อัพโหลดข้อมูลสำเร็จ!');
                setRecordId('');
                setFrameNumber('');
                setFps('');
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัพโหลดข้อมูล:', error);
            setMessage('เกิดข้อผิดพลาดในการอัพโหลดข้อมูล');
        }
    };

    return (
        <div>
            <div className="flex justify-center m-5" >
                <Button
                    onClick={testaxios}
                    variant="outline"
                    >Test API
                </Button>
            </div>

            <ul className="text-center m-5">
               {items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}

                {/* {data.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))} */}

                {frames.map((frame) => (
                    <li key={frame._id}>
                        <h2>การบันทึก: {frame.record_id}</h2>
                        <p>เฟรมที่: {frame.frame_number}</p>
                        <p>FPS: {frame.fps}</p>
                        <p>เวลาที่บันทึก: {new Date(frame.timestamp).toLocaleString()}</p>
                    </li>
                ))}
            </ul>

            <div className="">
                <h1 className="flex justify-center m-3">อัพโหลดข้อมูลเฟรม</h1>
                <form className="text-center m-3" onSubmit={handleSubmit}>
                    <div>
                        <label>Record ID:</label>
                        <input
                            type="text"
                            value={recordId}
                            onChange={(e) => setRecordId(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Frame Number:</label>
                        <input
                            type="number"
                            value={frameNumber}
                            onChange={(e) => setFrameNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>FPS:</label>
                        <input
                            type="number"
                            value={fps}
                            onChange={(e) => setFps(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">อัพโหลด</button>
                </form>
                {message && <p>{message}</p>}
            </div>

            <div className="flex justify-center m-5">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger  asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[25%] justify-center"
                        >
                        {value
                            ? SelectAPIs.find((api) => api.value === value)?.label
                            : "Select APIs"}
                        <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search APIs..." className="h-9" />
                            <CommandList>
                                <CommandEmpty>No API found.</CommandEmpty>
                                <CommandGroup>
                                {SelectAPIs.map((api) => (
                                    <CommandItem
                                        key={api.value}
                                        value={api.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }
                                    }>
                                    {api.label}
                                    <Check
                                        className={cn(
                                        "ml-auto",
                                        value === api.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    </CommandItem>
                                ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}