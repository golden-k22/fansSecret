"use client";
import UnderlinedText from "@/components/decorators/UnderlinedText";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea, } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { TriangleAlert } from "lucide-react";
import Image from "next/image";
import { use, useState } from "react";
import { createPostAction } from "../actions";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import CustomDatePicker from "@/components/ui/datepicker";
import axios from "axios";
import {
  Plus,
  Settings,
  PieChart,
  DollarSign
} from "lucide-react";

const ContentTab = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const [text, setText] = useState("");
  const [mediaType, setMediaType] = useState<"video" | "image">("video");
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [isMediaFileUploading, setIsMediaFileUploading] = useState<boolean>(false);
  const [tags, setTags] = useState("");
  const [collaboratetags, setCollaborateTags] = useState("");
  const [price, setPrice] = useState<number>()
  const [sheduled, setSheduled] = useState<Date | null>(null);
  const [isCollaborate, setIsCollaborate] = useState(false);

  const { toast } = useToast();

  const { mutate: createPost, isPending } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async () =>
      createPostAction({ text, isPublic, mediaUrl, mediaType, tags, collaboratetags, sheduled, price }),
    onSuccess: (response) => {
      if (!response.success) {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Post Created",
          description: "Your post has been successfully created",
        });
        setText("");
        setMediaType("video");
        setIsPublic(false);
        setMediaUrl("");
        setTags("");
        setSheduled(null);
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onClickCollaborate = () => {
    setIsCollaborate(true);
  }

  const getExtension = (filename: string): string => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };
  const handleMediaFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      alert("Please select a file.");
      return;
    }
    setIsMediaFileUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("directory", "secret_media");
    formData.append("fileName", `${new Date().getTime()}.${getExtension(file.name)}`);

    try {
      const response = await axios.post("/api/bunny-cdn/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMediaUrl(response.data.url);
    } catch (error) {
      console.error("Upload error:", error);
    }
    setIsMediaFileUploading(false);
  };

  return (
    <>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost();
        }}
      >
        <div className="grid grid-cols-12 gap-2 mt-10">
          <div className="col-span-12 md:col-span-10">
            <CardHeader>
              <CardTitle className="text-2xl">New Post</CardTitle>
              <CardDescription>
                Share your exclusive content with your audience. Select only one
                video/image at a time.
              </CardDescription>
            </CardHeader>
          </div>
          <div className="col-span-12 md:col-span-2">

            <Button className="flex hover:bg-primary-foreground font-bold hover:text-primary border rounded-full border-gray-800 px-5 py-2 my-10 mx-5" type="submit" disabled={isPending}>
              <Plus className="w-4 h-4" /> {isPending ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8">
            <div className="mx-5 grid gap-3">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Share today's exclusive"
                required
                defaultValue={title ? title : ""}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div className="mx-10 mt-8 grid gap-3">
              <Label>Media Type</Label>
              <div className="flex space-x-8">
                <RadioGroup
                  defaultValue="video"
                  value={mediaType}
                  onValueChange={(value: "image" | "video") => { setMediaType(value); setMediaUrl(""); }}
                  className="flex space-x-4" // Add this line
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="video" id="video" />
                    <Label htmlFor="video">Video</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="image" id="image" />
                    <Label htmlFor="image">Image</Label>
                  </div>
                </RadioGroup>
                <div className="flex space-x-4">
                  <label className="inline-flex !text-white justify-right whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 mt-4 mb-4">
                    <Plus className="w-5 h-5" />{isMediaFileUploading ? "Uploading ..." : "Upload Media"}
                    <input type="file" onChange={handleMediaFileChange} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
            {mediaUrl && mediaType === "image" && (
              <div className="mx-10 flex justify-center relative h-96">
                <Image
                  fill
                  src={mediaUrl}
                  alt="Uploaded Image"
                  className="object-contain rounded-md"
                />
              </div>
            )}
            {mediaUrl && mediaType === "video" && (
              <div className="mx-10 mx-auto">
                <video
                  width={960}
                  height={540}
                  className="rounded-md"
                  src={mediaUrl}
                  controls // Enables play, pause, volume, fullscreen, etc.
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

          </div>
          <div className="col-span-12 md:col-span-4 grid gap-8">
            <div className="mx-5 grid gap-3">
              <Label htmlFor="content">hashtags (comma separated)</Label>
              <Textarea
                value={tags}
                id="content"
                placeholder="Share today's exclusive"
                required
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <div className="mx-5 grid gap-3">
              <Label htmlFor="content">Price (Optional)</Label>
              <Input
                value={price}
                min="0"
                type="number"
                id="price"
                placeholder="Share today's exclusive"
                required
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div className="mx-5 grid gap-3">
              <Label htmlFor="content">Sheduling time (Optional)</Label>
              <CustomDatePicker
                selectedDate={sheduled}
                setSelectedDate={setSheduled}
              />
              {/* <div className="mt-4">
                <h2>Selected Date:</h2>
                <p>
                  {sheduled
                    ? sheduled.toLocaleDateString()
                    : "No date selected"}
                </p>
              </div> */}
            </div>
            <Button className="mx-5" onClick={onClickCollaborate} >
              Collaborate
            </Button>
            {
              isCollaborate &&
              <div className="mx-5 grid gap-3">
                <Label htmlFor="content">Tag others (comma separated)</Label>
                <Textarea
                  value={collaboratetags}
                  id="content"
                  placeholder="Collaborate post with others"
                  required
                  onChange={(e) => setCollaborateTags(e.target.value)}
                />
              </div>
            }
            <div className="mx-5 flex items-center space-x-2">
              <Checkbox
                id="public"
                checked={isPublic}
                onCheckedChange={(e) => setIsPublic(e as boolean)}
              />

              <Label
                htmlFor="public"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mark as public
              </Label>
            </div>
            <Alert variant="default" className="mx-5 w-200 text-yellow-400">
              <AlertTitle className="flex items-center space-x-2">
                <TriangleAlert className="h-4 w-4 text-yellow-400" />
                <span>Warning</span>
              </AlertTitle>
              <AlertDescription>
                Public posts will be visible to all users.
              </AlertDescription>
            </Alert>
          </div>
        </div>

      </form>
    </>
  );
};
export default ContentTab;
