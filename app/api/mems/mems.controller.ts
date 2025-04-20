import { responseMessages } from '@/constants/responseMessages';
import { newMemeDataValidation } from '@/helpers/apiDataValidation';
import { connectToDatabase } from '@/lib/mongoDb';
import { MemeType } from '@/types/mems';

import { NextRequest, NextResponse } from 'next/server';

import { createNewMeme, getAllMems, updateMeme } from './mems.service';

export const httpGetMems = async (request: NextRequest) => {
  try {
    await connectToDatabase();

    const mems = await getAllMems();
    return NextResponse.json(mems, {
      status: responseMessages.codes[200],
    });
  } catch (error) {
    console.error('Error during GET mems:', error);
    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
};

export const httpPutNewMem = async (request: NextRequest) => {
  try {
    await connectToDatabase();

    const body: Omit<MemeType, 'id'> = await request.json();
    const errors = newMemeDataValidation(body);

    if (errors.length) {
      return NextResponse.json(
        {
          error: errors,
        },
        { status: responseMessages.codes[422] },
      );
    }

    const newMeme = createNewMeme(body);

    return NextResponse.json(newMeme, {
      status: responseMessages.codes[200],
    });
  } catch (error) {
    console.error('Error during CREATE mem:', error);
    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
};

export const httpUpdateMem = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    await connectToDatabase();

    const body: Partial<MemeType> = await request.json();
    const { id: paramsID } = await params;

    const { id } = body;

    if (!id || id !== paramsID) {
      return NextResponse.json(
        { error: true, message: responseMessages.memes.exist },
        {
          status: responseMessages.codes[404],
        },
      );
    }

    const newMeme = await updateMeme(body);

    return NextResponse.json(newMeme, {
      status: responseMessages.codes[200],
    });
  } catch (error) {
    console.error('Error during UPDATE mem:', error);
    return NextResponse.json(
      { error: responseMessages.server.error },
      { status: responseMessages.codes[500] },
    );
  }
};
