"use client";
import RotatedText from "@/components/decorators/RotatedText";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { addNewProductToStoreAction } from "../actions";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const AddNewProductForm = () => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [isMediaFileUploading, setIsMediaFileUploading] = useState<boolean>(false);

	const { toast } = useToast();
	const queryClient = useQueryClient();

	const { mutate: createProduct, isPending } = useMutation({
		mutationKey: ["createProduct"],
		mutationFn: async () => await addNewProductToStoreAction({ name, image: imageUrl, price }),
		onSuccess: (response) => {
			if(!response.success){
				toast({
					title: "Error",
					description: response.message,
					variant: "destructive",
				});
			}
			else{
				queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
				toast({
					title: "Post Submitted",
					description: "The post has been submitted successfully",
				});
	
				setName("");
				setPrice("");
				setImageUrl("");
			}			
		},
	});


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
			setImageUrl(response.data.url);
		} catch (error) {
			console.error("Upload error:", error);
		}
		setIsMediaFileUploading(false);
	};


	return (
		<>
			<p className='text-3xl tracking-tighter my-5 font-medium text-center'>
				Create Premium Post
			</p>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					createProduct();
				}}
			>
				<Card className='w-full max-w-md mx-auto'>
					<CardHeader>
						<CardTitle className='text-2xl'>New Post</CardTitle>

					</CardHeader>

					<CardContent className='grid gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='name'>Title</Label>
							<Input
								id='name'
								type='text'
								placeholder='FansSecret Special'
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='price'>Price ($)</Label>
							<Input
								id='price'
								type='number'
								required
								value={price}
								placeholder='14.99'
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>

						<div className="flex flex-col items-center">
							<label className="inline-flex items-center !text-white justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-full mt-2 mb-4">
								{isMediaFileUploading ? "Uploading ..." : "Upload an Image."}
								<input type="file" onChange={handleMediaFileChange} className="hidden" />
							</label>
						</div>

						{imageUrl && (
							<div className='flex justify-center relative w-full h-96'>
								<Image fill src={imageUrl} alt='Product Image' className='rounded-md object-contain' />
							</div>
						)}
					</CardContent>
					<CardFooter>
						<Button className='w-full' type='submit' disabled={isPending}>
							{isPending ? "Adding..." : "Submit"}
						</Button>
					</CardFooter>
				</Card>
			</form>
		</>
	);
};
export default AddNewProductForm;
